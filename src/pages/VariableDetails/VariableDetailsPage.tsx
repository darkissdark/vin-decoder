import { useParams } from "react-router-dom";
import { PageMeta } from "@/components/seo/PageMeta/PageMeta";
import { BackButton } from "@/components/ui/BackButton/BackButton";
import { VariableDetailsContent } from "@/components/variables/VariableDetailsContent/VariableDetailsContent";
import { useVariableDetails } from "@/hooks/useVariableDetails";

export function VariableDetailsPage() {
  const { variableId } = useParams<{ variableId: string }>();
  const { state, variable, meta, parsedId } = useVariableDetails(variableId);

  return (
    <>
      <PageMeta {...meta} />

      <nav aria-label="Breadcrumb">
        <BackButton fallbackTo="/variables" ariaLabel="Back to variables list">
          ← Back to variables
        </BackButton>
      </nav>

      <VariableDetailsContent state={state} variable={variable} parsedId={parsedId} />
    </>
  );
}
