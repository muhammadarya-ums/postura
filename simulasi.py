import requests
import time
import random

# GANTI URL INI dengan URL Realtime Database kamu (tambahkan .json di ujungnya)
FIREBASE_URL = "https://postura-23114-default-rtdb.asia-southeast1.firebasedatabase.app/postura.json"

print("🚀 Memulai simulasi sensor Postura...")

while True:
    # Simulasi data sudut untuk 3 sensor
    data = {
        "sensor_1": {"angle": round(random.uniform(5, 35), 1)},
        "sensor_2": {"angle": round(random.uniform(5, 15), 1)},
        "sensor_3": {"angle": round(random.uniform(30, 45), 1)}
    }
    
    try:
        # Mengirim data menggunakan metode PATCH agar tidak menghapus data lain
        response = requests.patch(FIREBASE_URL, json=data)
        if response.status_code == 200:
            print(f"✅ Data terkirim: S1:{data['sensor_1']['angle']}° | S2:{data['sensor_2']['angle']}°")
        else:
            print(f"❌ Gagal: {response.status_code}")
    except Exception as e:
        print(f"⚠️ Error: {e}")

    time.sleep(2) # Kirim setiap 2 detik