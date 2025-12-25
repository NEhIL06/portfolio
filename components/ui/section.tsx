import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    id?: string
    className?: string
}

export function Section({ children, id, className, ...props }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("scroll-mt-24", className)}
            {...props}
        >
            {children}
        </section>
    )
}
