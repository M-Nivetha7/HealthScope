import joblib
import numpy as np
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(BASE_DIR, "backend", "disease_model.joblib")
SYMPTOMS_PATH = os.path.join(BASE_DIR, "backend", "all_symptoms.joblib")
DESC_CSV = os.path.join(BASE_DIR, "backend", "symptom_Description.csv")
PREC_CSV = os.path.join(BASE_DIR, "backend", "symptom_precaution.csv")

clf = joblib.load(MODEL_PATH)
all_symptoms = joblib.load(SYMPTOMS_PATH)
symptom_to_idx = {s: i for i, s in enumerate(all_symptoms)}

desc_df = pd.read_csv(DESC_CSV)
prec_df = pd.read_csv(PREC_CSV)

desc_df["Disease"] = desc_df["Disease"].astype(str).str.strip().str.lower()
prec_df["Disease"] = prec_df["Disease"].astype(str).str.strip().str.lower()

disease_to_desc = dict(zip(desc_df["Disease"], desc_df["Description"]))

disease_to_precautions = {}
for _, row in prec_df.iterrows():
    d = row["Disease"]
    precs = [
        str(row["Precaution_1"]).strip(),
        str(row["Precaution_2"]).strip(),
        str(row["Precaution_3"]).strip(),
        str(row["Precaution_4"]).strip(),
    ]
    precs = [p for p in precs if p and p.lower() != "nan"]
    disease_to_precautions[d] = precs

def encode_symptoms(symptom_list):
    x = np.zeros(len(all_symptoms), dtype=int)
    for s in symptom_list:
        s = s.strip()
        if s in symptom_to_idx:
            x[symptom_to_idx[s]] = 1
    return x.reshape(1, -1)

def predict_disease(symptom_list, top_k=3):
    X = encode_symptoms(symptom_list)
    probs = clf.predict_proba(X)[0]
    classes = clf.classes_
    top_idx = np.argsort(probs)[::-1][:top_k]
    results = []
    for i in top_idx:
        name = classes[i]
        key = name.strip().lower()
        desc = disease_to_desc.get(key, "Description not available.")
        precs = disease_to_precautions.get(key, [])
        results.append({
            "disease": name,
            "probability": float(probs[i]),
            "description": desc,
            "precautions": precs,
        })
    return results
