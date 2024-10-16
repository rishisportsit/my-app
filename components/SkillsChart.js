"use client";
import React, { useEffect, useRef } from "react";
import { AgCharts } from "ag-charts-community";

const ChartComponent = () => {
  const chartContainerRef = useRef(null);

  // Data function
  const getData = () => {
    return {
      stores: [
        {
          store: "Selfridges",
          total: 4000000000,
        },
      ],
      departments: [
        { department: "Electronics", value: 15000000 },
        { department: "Clothing", value: 10000000 },
        { department: "Home", value: 15000000 },
      ],
      categories: [
        { category: "Smartphones", value: 4000000 },
        { category: "Laptops", value: 6000000 },
        { category: "Cameras", value: 5000000 },
        { category: "Men's", value: 3000000 },
        { category: "Women's", value: 5000000 },
        { category: "Children's", value: 2000000 },
        { category: "Furniture", value: 8000000 },
        { category: "Appliances", value: 6000000 },
        { category: "Decor", value: 1000000 },
      ],
    };
  };

  useEffect(() => {
    // Chart logic
    const data = getData();
    const numFormatter = new Intl.NumberFormat("en-US");

    const tooltip = {
      renderer: ({ datum, angleKey }) => ({
        content: `${numFormatter.format(datum[angleKey] / 1000000)}M`,
      }),
    };

    const options = {
      container: chartContainerRef.current,
      title: {
        text: "Oxford Street Selfridges",
      },
      subtitle: {
        text: "Total Product Value by Department",
      },
      series: [
        {
          data: data.categories,
          type: "donut",
          calloutLabelKey: "category",
          calloutLabel: {
            offset: 10,
          },
          angleKey: "value",
          radiusKey: "value",
          outerRadiusRatio: 0.8,
          innerRadiusRatio: 0.6,
          fillOpacity: 0.4,
          tooltip,
        },
        {
          data: data.departments,
          type: "donut",
          sectorLabelKey: "department",
          angleKey: "value",
          outerRadiusRatio: 0.6,
          innerRadiusRatio: 0.4,
          fillOpacity: 0.6,
          tooltip,
        },
        {
          data: data.stores,
          type: "donut",
          sectorLabelKey: "store",
          angleKey: "total",
          outerRadiusRatio: 0.4,
          innerRadiusRatio: 0,
          tooltip: {
            renderer: ({ datum, angleKey }) => ({
              content: `Total: ${numFormatter.format(
                datum[angleKey] / 1000000000
              )}B`,
            }),
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };

    AgCharts.create(options);
  }, []);

  return (
    <div>
      {/* Inline CSS in the style tag */}
      <style>{`
        :root {
          overflow: hidden;
          font-family: -apple-system, system-ui, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          --button-background-color: transparent;
          --button-text-color: #212529;
          --button-color-border-primary: #d0d5dd;
          --button-hover-background-color: rgba(0, 0, 0, 0.1);
        }

        :root[data-dark-mode="false"] {
          background: white;
        }

        :root[data-dark-mode="true"] {
          background: #192232;
          color: white;
          --button-text-color: #f8f9fa;
          --button-color-border-primary: rgba(255, 255, 255, 0.2);
          --button-hover-background-color: #2a343e;
        }

        :root, body {
          height: 100%;
          width: 100%;
          margin: 0;
          box-sizing: border-box;
        }

        body {
          display: grid;
          grid-auto-rows: minmax(0, 1fr);
          grid-auto-columns: minmax(0, 1fr);
          padding: 1rem;
        }

        #myChart {
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Chart container */}
      <div
        ref={chartContainerRef}
        id="myChart"
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default ChartComponent;
