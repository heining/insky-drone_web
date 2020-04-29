import React from 'react'
import { G2, Chart, Coordinate, Axis, Legend, Tooltip, Geom, Interval } from "bizcharts";
import DataSet from "@antv/data-set";

const Pie = props => {
  const { DataView } = DataSet;
  const data = [
    {
      item: "固定翼",
      count: 40
    },
    {
      item: "双旋翼",
      count: 21
    },
    {
      item: "直升机",
      count: 17
    },
    {
      item: "多旋翼",
      count: 13
    },
    {
      item: "其他",
      count: 9
    }
  ];
  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + "%";
        return val;
      }
    }
  };
  return (
    <div>
      <Chart
        height={200}
        data={dv.rows}
        scale={cols}
        // padding={[80, 100, 80, 80]}
        autoFit
      >
        <Coordinate type='theta' innerRadius={0.5} />
        <Axis name="percent" />
        <Legend position="right" />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Geom
          type="interval"
          adjust={'stack'}
          position="percent"
          color="item"
          tooltip={[
            "item*percent",
            (item, percent) => {
              percent = percent * 100 + "%";
              return {
                name: item,
                value: percent
              };
            }
          ]}
          style={{
            lineWidth: 1,
            stroke: "#fff"
          }}
        >
          {/* <Interval adjust="stack" /> */}
        </Geom>
      </Chart>
    </div>
  )
}

export default Pie