import { e, number, re, to } from "mathjs";
import { Solution, readInput, title, withTime } from "../../common/types";

type Dot = [x: number, y: number];
type VerticalEdge = [x: number, minY: number, maxY: number];
type HorizontalEdge = [y: number, minX: number, maxX: number];

const getDots = (data: string): { dots: Dot[] } => {
  const dots = data.split("\n").map((l) => {
    const [x, y] = l.split(",").map(Number);
    return [x, y] as Dot;
  });
  return { dots };
};

const surface = ([x1, y1]: Dot, [x2, y2]: Dot): number => {
  return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
};

const combinations = (dots: Dot[]): Dot[][] => {
  const pairs: Dot[][] = [];
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      pairs.push([dots[i], dots[j]]);
    }
  }
  return pairs;
};

const part1 = (data: string) => {
  const { dots } = getDots(data);

  let max = 0;
  for (let [a, b] of combinations(dots)) {
    max = Math.max(max, surface(a, b));
  }
  return max;
};

const part2 = (data: string) => {
  const { dots } = getDots(data);

  const vertices = dots;

  const edges: [Dot, Dot][] = vertices.map((v, i) => {
    const next = vertices[(i + 1) % vertices.length];
    return [v, next];
  });

  const vertical_edges: VerticalEdge[] = [];
  const horizontal_edges: HorizontalEdge[] = [];
  for (const [[x0, y0], [x1, y1]] of edges) {
    if (x0 === x1) {
      const minY = Math.min(y0, y1);
      const maxY = Math.max(y0, y1);
      vertical_edges.push([x0, minY, maxY]);
    }
    if (y0 === y1) {
      const minX = Math.min(x0, x1);
      const maxX = Math.max(x0, x1);
      horizontal_edges.push([y0, minX, maxX]);
    }
  }

  let maxArea = 0;

  for (const [p0, p1] of combinations(vertices)) {
    const [x0, y0] = p0;
    const [x1, y1] = p1;

    // min_x, min_y, max_x, max_y = min(x0, x1)+0.5, min(y0, y1)+0.5, max(x0, x1)-0.5, max(y0, y1)-0.5
    const min_x = Math.min(x0, x1) + 0.5;
    const min_y = Math.min(y0, y1) + 0.5;
    const max_x = Math.max(x0, x1) - 0.5;
    const max_y = Math.max(y0, y1) - 0.5;

    // any( ... for (v_edge, h_edge) in zip(vertical_edges, horizontal_edges))
    let blocked = false;
    const m = Math.min(vertical_edges.length, horizontal_edges.length);
    for (let i = 0; i < m; i++) {
      const [v_x, min_v_y, max_v_y] = vertical_edges[i];
      const [h_y, min_h_x, max_h_x] = horizontal_edges[i];

      const verticalIntersects =
        min_x <= v_x &&
        v_x <= max_x &&
        ((min_v_y <= min_y && min_y <= max_v_y) ||
          (min_v_y <= max_y && max_y <= max_v_y));

      const horizontalIntersects =
        min_y <= h_y &&
        h_y <= max_y &&
        ((min_h_x <= min_x && min_x <= max_h_x) ||
          (min_h_x <= max_x && max_x <= max_h_x));

      if (verticalIntersects || horizontalIntersects) {
        blocked = true;
        break;
      }
    }

    if (!blocked) {
      // p2 = max(p2, (abs(x0-x1)+1)*(abs(y0-y1)+1))
      const area = (Math.abs(x0 - x1) + 1) * (Math.abs(y0 - y1) + 1);
      if (area > maxArea) maxArea = area;
    }
  }

  return maxArea;
};

export const solve: Solution = (source) => {
  title("Day 9: Movie Theater");
  const data = readInput(source, import.meta.dir);
  withTime(part1)(data);
  withTime(part2)(data);
};
