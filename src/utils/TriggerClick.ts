export function TriggerClickWithId(id: string) {
    const element = document.getElementById(id);
    if (element) element.click();
}
