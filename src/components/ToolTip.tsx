interface ToolTipProps {
    title: string;
}

export const ToolTip = ({ title }: ToolTipProps) => {
    return (
        <span
            className="
                absolute left-1/2 -bottom-10 
                -translate-x-1/2 whitespace-nowrap
                bg-black text-white text-xs px-2 py-1 rounded-md 
                opacity-0 group-hover:opacity-100 
                translate-y-1 group-hover:translate-y-0
                transition-all duration-200
            "
        >
            {title}
        </span>
    );
};
