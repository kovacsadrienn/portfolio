const LoadingKomponens =function({szazalek}){
    return(
     <progress id="file"  max="100" value={szazalek}> {szazalek}% </progress>
    );

    }

export default LoadingKomponens;