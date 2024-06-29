export const hideComponent = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'none';
};

export const showComponent = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.style.display = 'block';
};
