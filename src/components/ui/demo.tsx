import { ActionSearchBar } from "@/components/ui/action-search-bar"

function ActionSearchBarDemo() {
    return (
        <div className="p-20 bg-[#0F1115] min-h-screen">
            <ActionSearchBar 
                onSearch={(q) => console.log("Searching for:", q)}
            />
        </div>
    )
}

export { ActionSearchBarDemo }
