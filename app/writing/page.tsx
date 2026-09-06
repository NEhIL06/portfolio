import type { Metadata } from "next"
import { PageHeading } from "@/components/editorial"
import { WritingList } from "@/components/writing-list"
export const metadata: Metadata = { title: "Writing", description: "Essays and thoughts on engineering, systems, and building software in the age of AI." }
export default function WritingPage() {
  return <div className="site-container page-space"><PageHeading label="Essays & observations" title="Notes from" accent="the workbench." description="Long-form thinking on engineering, systems, and what it means to build software when the tools keep changing." /><WritingList /></div>
}
