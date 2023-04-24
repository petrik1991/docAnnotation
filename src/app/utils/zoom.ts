export function zoom(element: HTMLElement, zoomIn: boolean = true): void {
    const curWidth = element.clientWidth;
    const curHeight = element.clientHeight;
    const direction = zoomIn ? 1 : -1;
    const width = (curWidth * 0.1 * direction) + curWidth;
    const height = (curHeight * 0.1 * direction) + curHeight;

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
}