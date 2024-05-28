<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let k = 3;
  let data = [];
  let centroids = [];

  // Generate random data points
  const generateData = () => {
    data = Array.from({ length: 50 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 600,
    }));
    initializeCentroids();
  };

  // Initialize centroids randomly
  const initializeCentroids = () => {
    centroids = Array.from({ length: k }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 600,
    }));
  };

  // Calculate Euclidean distance
  const distance = (a, b) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  };

  // Assign data points to the nearest centroid
  const assignClusters = () => {
    data.forEach((point) => {
      let minDist = Infinity;
      centroids.forEach((centroid, i) => {
        const dist = distance(point, centroid);
        if (dist < minDist) {
          minDist = dist;
          point.cluster = i;
        }
      });
    });
  };

  // Update centroids to the mean of their clusters
  const updateCentroids = () => {
    centroids.forEach((centroid, i) => {
      const clusterPoints = data.filter((d) => d.cluster === i);
      if (clusterPoints.length) {
        centroid.x =
          d3.mean(clusterPoints, (d) => d.x) || centroid.x;
        centroid.y =
          d3.mean(clusterPoints, (d) => d.y) || centroid.y;
      }
    });
  };

  // Perform K-Means clustering
  const kMeans = () => {
    assignClusters();
    updateCentroids();
  };

  // Initialize data and clustering
  onMount(() => {
    generateData();
    kMeans();
    draw();
  });

  // Redraw on data update
  const draw = () => {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 5)
      .attr("fill", (d) => d3.schemeCategory10[d.cluster]);

    svg
      .selectAll("centroid")
      .data(centroids)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 10)
      .attr("fill", "red")
      .attr("stroke", "black");
  };
</script>

<style>
  svg {
    border: 1px solid black;
  }
</style>

<div>
  <input type="range" min="1" max="10" bind:value={k} on:input="{() => { initializeCentroids(); kMeans(); draw(); }}" />
  <svg width="800" height="600"></svg>
</div>
