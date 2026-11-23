import data from "@/data/rules.json";
import bunker from "@/assets/rule-bunker.jpg";
import green from "@/assets/rule-green.jpg";
import equipment from "@/assets/rule-equipment.jpg";
import fairway from "@/assets/rule-fairway.jpg";
import course from "@/assets/hero-course.jpg";

export type Rule = {
  number: number;
  title: string;
  summary: string;
  keywords: string;
  points: string[];
  penalty: string | null;
  url: string;
};

export const rules: Rule[] = data as Rule[];

const images: Record<number, string> = {
  1: course, 2: fairway, 3: equipment, 4: equipment, 5: course, 6: course,
  7: fairway, 8: fairway, 9: fairway, 10: equipment, 11: fairway,
  12: bunker, 13: green, 14: green, 15: green,
};

export const ruleImage = (n: number) => images[n] ?? course;
export const getRule = (n: number) => rules.find((r) => r.number === n);

export function searchRules(query: string): Rule[] {
  const q = query.trim().toLowerCase();
  if (!q) return rules;
  return rules.filter((r) =>
    [String(r.number), r.title, r.summary, r.keywords, ...r.points].join(" ").toLowerCase().includes(q),
  );
}
