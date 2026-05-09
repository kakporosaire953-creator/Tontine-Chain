function shareTontine(name, code) {
    const text = `Salut ! Rejoins ma tontine scurise sur TontineChain. ` +
                 `C'est 100% scuris par Blockchain au Bnin. \n\n` +
                 `Nom: ${name}\n` +
                 `Code d'accs: ${code}\n\n` +
                 `Lien: ${window.location.origin}/join-tontine.html?code=${code}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
}
