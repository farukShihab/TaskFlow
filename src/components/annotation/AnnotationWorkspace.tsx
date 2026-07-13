import { AnnotationToolbar } from "./AnnotationToolbar";
import { PolygonList } from "./PolygonList";
import { AnnotationCanvas } from "./canvas/AnnotationCanvas";
import { ImageNavigator } from "./ImageNavigator";

export function AnnotationWorkspace() {
    return (
        <div className="flex h-full gap-6">
            <div className="min-w-0 flex-1">

                <div className="mt-4">
                    <AnnotationToolbar />
                </div>

                <div className="mt-4">
                    <AnnotationCanvas />
                </div>

                <ImageNavigator />
            </div>

            <div className="w-80 shrink-0 overflow-y-auto border-l p-4">
                <PolygonList />
            </div>
        </div>
    );
}