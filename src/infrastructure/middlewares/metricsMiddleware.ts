import { Request, Response, NextFunction } from "express";
import { performance } from "perf_hooks";
import logger from "../utils/logger";

interface EndpointMetrics {
  [endpoint: string]: {
    count: number;
    totalLatency: number;
    averageLatency: number;
  };
}

const endpointMetrics: EndpointMetrics = {};

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = performance.now();

  res.on("finish", () => {
    const end = performance.now();
    const latency = end - start;
    const endpoint = req.method + " " + req.path;

    if (!endpointMetrics[endpoint]) {
      endpointMetrics[endpoint] = {
        count: 0,
        totalLatency: 0,
        averageLatency: 0,
      };
    }

    endpointMetrics[endpoint].count += 1;
    endpointMetrics[endpoint].totalLatency += latency;
    endpointMetrics[endpoint].averageLatency =
      endpointMetrics[endpoint].totalLatency / endpointMetrics[endpoint].count;

    logger.info({
      message: "Endpoint Accessed",
      endpoint,
      latency: `${latency.toFixed(2)}ms`,
      totalRequests: endpointMetrics[endpoint].count,
      averageLatency: `${endpointMetrics[endpoint].averageLatency.toFixed(
        2
      )}ms`,
    });
  });

  next();
};

// Export metrics for reporting
export const getMetrics = () => endpointMetrics;
