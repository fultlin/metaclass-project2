function LanguageList({ languages }:any) {
    const totalBytes:any = Object.values(languages).reduce((sum:any, num:any) => sum + num, 0);

    const languageColors:any = {
        JavaScript: "#f1e05a",
        Python: "#3572A5",
        Java: "#b07219",
        Ruby: "#701516",
        PHP: "#4F5D95",
        CSS: "#563d7c",
        TypeScript: "#2b7489",
        C: "#555555",
        "C++": "#f34b7d",
        'C#': "#178600",
    };
    
    return (
        <div className="repo__page-languages">
            <div style={{ display: 'flex', width: '100%', overflow: 'hidden',marginTop: '8px' ,marginBottom: '10px', borderRadius: '6px', height: '10px' }}>
                {Object.entries(languages).map(([language, bytes]:any) => {
                    const percentage = ((bytes / totalBytes) * 100).toFixed(2);
                    const color = languageColors[language] || "#cccccc";
                    return (
                        <div key={language} style={{ width: `${percentage}%`, backgroundColor: color, height: '20px' }}></div>
                    );
                })}
            </div>
            <div className="language-details">
                {Object.entries(languages).map(([language, bytes]:any) => {
                    const percentage = ((bytes / totalBytes) * 100).toFixed(2);
                    const color = languageColors[language] || "#cccccc";
                    return (
                        <div key={language} style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                            <span style={{ width: '12px', height: '12px', backgroundColor: color, marginRight: '5px', display: 'inline-block' }}></span>
                            <span style={{ flex: 1 }} className="lanuage">{language}</span>
                            <span className="language-percentage" style={{ minWidth: '50px', textAlign: 'right' }}>{percentage}%</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LanguageList