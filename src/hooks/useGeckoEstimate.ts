/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react';

// We will dynamically import transformers.js inside useEffect to avoid SSR errors.

export interface EstimateResult {
  estimatedValue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

export function useGeckoEstimate() {
  const [isReady, setIsReady] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [modelPipeline, setModelPipeline] = useState<any>(null);

  // Initialize the model in the background to ensure <100ms latency on actual requests
  useEffect(() => {
    let active = true;

    async function loadModel() {
      try {
        // Dynamically import to avoid SSR errors with Node-specific modules
        const { pipeline, env } = await import('@xenova/transformers');
        env.allowLocalModels = false;

        // Example: load a generic feature-extraction or regression model
        // In a real scenario, this would be a custom PropTech regression model exported to ONNX
        const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
          device: 'webgpu' // Opt-in to WebGPU for high performance
        } as any);
        
        if (active) {
          setModelPipeline(() => pipe);
          setIsReady(true);
        }
      } catch (error) {
        console.error("Failed to load local AI model:", error);
        // Fallback or handle error
      }
    }

    loadModel();

    return () => {
      active = false;
    };
  }, []);

  const estimateProperty = useCallback(async (
    features: { sqft: number; location: string; yearBuilt: number; [key: string]: any }
  ): Promise<EstimateResult | null> => {
    if (!isReady || !modelPipeline) {
      console.warn("GeckoEstimate model is not ready yet.");
      return null;
    }

    setIsEstimating(true);
    try {
      // Mocked AI Inference Loop
      // 1. Create a prompt or feature vector
      const inputStr = `Estimate property in ${features.location} with ${features.sqft} sqft built in ${features.yearBuilt}`;
      
      // 2. Run inference (here just generating embeddings to prove the local AI works)
      const output = await modelPipeline(inputStr, { pooling: 'mean', normalize: true });
      
      // 3. Mock logic mapping embedding tensor to an estimate
      const mockValue = features.sqft * 15000 + (Math.random() * 500000);
      const trendScore = output.data[0]; // arbitrary
      
      return {
        estimatedValue: mockValue,
        confidence: 0.85 + (Math.random() * 0.1),
        trend: trendScore > 0 ? 'up' : 'down'
      };
    } catch (error) {
      console.error("Inference failed:", error);
      return null;
    } finally {
      setIsEstimating(false);
    }
  }, [isReady, modelPipeline]);

  return {
    isReady,
    isEstimating,
    estimateProperty
  };
}
