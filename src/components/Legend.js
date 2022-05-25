import { useEffect } from "react";
import L from "leaflet";

function Legend({ map }) {
    useEffect(() => {
        if (map) {
            const getColor = value => {
                return value >= -95 ? "red"
                    : value >= -100 ? "orange"
                    : value >= -105 ? "yellow"
                    : value >= -110 ? "green"
                    : value >= -115 ? "blue"
                    : "purple";
            };

            const legend = L.control({ position: "bottomleft" });

            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "info legend");
                const grades = [-90, -95, -100, -105, -110, -115];
                let labels = [];
                let level = 1;

                // Fill the legend with entries for each RSSI level range
                labels.push('<i style="background:' + getColor(grades[level]) + '">&nbsp&nbsp&nbsp&nbsp</i> &nbsp&gt; ' + grades[level] + 'dBm');
                for (level = 1; level < grades.length - 1; level++)
                    labels.push('<i style="background:' + getColor(grades[level + 1]) + '">&nbsp&nbsp&nbsp&nbsp</i> &nbsp' + grades[level] + (grades[level] ? "dBm to " + grades[level + 1] : "") + "dBm");
                labels.push('<i style="background:' + getColor(grades[level + 1]) + '">&nbsp&nbsp&nbsp&nbsp</i> &nbsp&lt; ' + grades[level] + 'dBm');

                div.innerHTML = labels.join("<br>");
                return div;
            };

            legend.addTo(map);
        }
    }, [map]);
    return null;
}

export default Legend;