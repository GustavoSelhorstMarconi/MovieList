export function Badge (props: {name: string, color: string}) {
    const { name, color } = props;

    return (
        <p className={`min-h-2 min-w-8 rounded-lg ${color} p-2`}>
            {name}
        </p>
    )
}