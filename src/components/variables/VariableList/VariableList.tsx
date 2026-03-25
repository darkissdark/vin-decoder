import { Link } from "react-router-dom";
import type { VehicleVariable } from "@/types/vin";
import { stripHtmlToText, truncateText } from "@/utils/html";
import styles from "./VariableList.module.css";

type VariableListProps = {
  items: VehicleVariable[];
  descriptionPreviewLength?: number;
};

const DEFAULT_PREVIEW_LENGTH = 100;

export function VariableList({
  items,
  descriptionPreviewLength = DEFAULT_PREVIEW_LENGTH,
}: VariableListProps) {
  return (
    <ul className={styles.list}>
      {items.map((variable) => (
        <li key={variable.ID} className={styles.listItem}>
          <Link to={`/variables/${variable.ID}`} className={styles.link}>
            {variable.Name}
          </Link>
          <p className={styles.description}>
            {variable.Description
              ? truncateText(stripHtmlToText(variable.Description), descriptionPreviewLength)
              : "No description"}
          </p>
        </li>
      ))}
    </ul>
  );
}
