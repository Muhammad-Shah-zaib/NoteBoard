const SavedNotes = () => {
    const notes = [
        { title: 'Redux Core' },
        { title: 'Redact redux' },
        { title: 'MATH CLASS-5' },
        { title: 'Daily Todos' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
        { title: 'Partial Fractions' },
    ];
    return (
        <>
            <div className={`saved-notes-ctn`}>
                <h3 className={`px-2 pt-2 font-mono text-lg font-bold`}>
                    Notes
                </h3>
                {/* existing whiteboards */}
                <div>
                    {notes
                        .filter((n, i) => {
                            if (i < 3) {
                                if (n.title.length > 20) {
                                    n.title = n.title.substring(0, 20) + '...';
                                }
                                return true;
                            }
                            return false;
                        })
                        .map((n, i) => (
                            <div
                                key={i}
                                className={`cursor-pointer rounded-lg px-2 py-1 transition-all duration-300 hover:bg-zinc-800`}
                            >
                                <span className={`text-sm`}>{n.title}</span>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default SavedNotes;
