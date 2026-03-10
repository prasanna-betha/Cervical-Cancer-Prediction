import { useState } from "react";
import { Search } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GynecologistFinderDialogProps {
    trigger: React.ReactNode;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function GynecologistFinderDialog({
    trigger,
    isOpen,
    onOpenChange,
}: GynecologistFinderDialogProps) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        if (city.trim()) {
            window.open(
                `https://www.google.com/maps/search/gynecologists+in+${encodeURIComponent(
                    city
                )}`,
                "_blank"
            );
            onOpenChange(false);
            setCity("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Find Nearby Gynecologists</DialogTitle>
                    <DialogDescription>
                        Enter your city to find certified gynecologists near you via Google Maps.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 py-4">
                    <div className="grid flex-1 gap-2">
                        <Input
                            id="city"
                            placeholder="Enter your city (e.g., New York)"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>
                    <Button type="submit" size="sm" onClick={handleSearch} disabled={!city.trim()}>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
