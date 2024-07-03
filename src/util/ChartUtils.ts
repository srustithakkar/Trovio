interface RawChartData {
    feed: string,
    pair: string,
    periodStart: string,
    lastModified: string,
    resolution: number,
    priceDecimals: string,
    volumeDecimals: string,
    o: number[];
    h: number[];
    l: number[];
    c: number[];
    v: number[];
}

interface DataPoint {
    timestampMillis: number,
    timestamp: string,
    price: number
}

interface SimplifiedChartData {
    periodStart: string,
    resolution: number,
    data: DataPoint[]
}

function convertChartData(rawData: RawChartData): SimplifiedChartData {
    const startTime = new Date(rawData.periodStart);

    return {
        periodStart: rawData.periodStart,
        resolution: rawData.resolution,
        data: rawData.h.map((highValue, index) => {
            const dataPointTime = new Date(startTime.getTime() + (index * rawData.resolution * 1000))
            
            const value = (rawData.l[index] + highValue) / 2;
            const valueRounded = Math.round(value * 100) / 100;

            return {
                timestampMillis: dataPointTime.getTime(),
                timestamp: dataPointTime.toISOString(),
                price: valueRounded
            };
        })
    }
}

export { convertChartData, type SimplifiedChartData };