import { SimplifiedChartData, convertChartData } from "./ChartUtils";

test("convertChartData", () => {
    let result: SimplifiedChartData = {
        periodStart: "2020-08-25T15:00:00Z",
        resolution: 10,
        data: [
            {
                price: 17.88,
                timestamp: "2020-08-25T15:00:00.000Z",
                timestampMillis: 1598367600000,
            },
            {
                price: 43.04,
                timestamp: "2020-08-25T15:00:10.000Z",
                timestampMillis: 1598367610000,
            },
            {
                price: 22.08,
                timestamp: "2020-08-25T15:00:20.000Z",
                timestampMillis: 1598367620000,
            }
        ],
    };

    expect(
        convertChartData({
            feed: "PM",
            pair: "XAU-AUD",
            periodStart: "2020-08-25T15:00:00Z",
            lastModified: "2020-08-25T16:00:11.723Z",
            resolution: 10,
            priceDecimals: "2",
            volumeDecimals: "5",
            o: [12.23, 32.44, 45, 23],
            h: [23.45, 45.23, 23.64],
            l: [12.32, 40.84, 20.52],
            c: [34.76, 83.54, 23.45],
            v: [43.65, 65.45, 23.54],
        })
    ).toStrictEqual(result);
});
