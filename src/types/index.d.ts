// Define customized types
import { QuestionTableData } from "@/features/questions/schemas";
import { TestTableData } from "@/features/tests/schemas/testTableDataSchema";
import { ZodIssue } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type ActionResult<T> = 
    {status: 'success', data: T} | {status: 'error', error: string | ZodIssue[]}

export type TableData = TestTableData | QuestionTableData
