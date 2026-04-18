import * as tf from '@tensorflow/tfjs';
import { useState, useEffect } from 'react';

export const usePostureAI = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<string>("Memuat AI...");

  const labels = ["Tegak", "Kifosis", "Text Neck", "Lordosis", "Slouching"];

  useEffect(() => {
    // Load model dari folder public
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/model/model.json');
        setModel(loadedModel);
        setPrediction("AI Siap, Hubungkan Bluetooth");
      } catch (err) {
        console.error("Gagal load model AI", err);
      }
    };
    loadModel();
  }, []);

  const predictPosture = (s1: number, s2: number, s3: number) => {
    if (!model) return;

    // Masukkan data sensor ke dalam tensor
    const input = tf.tensor2d([[s1, s2, s3]]);
    
    // Lakukan prediksi
    const output = model.predict(input) as tf.Tensor;
    const labelIndex = output.argMax(1).dataSync()[0];
    
    setPrediction(labels[labelIndex]);
    
    // Bersihkan memori tensor
    input.dispose();
    output.dispose();
  };

  return { prediction, predictPosture };
};