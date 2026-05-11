import LoadingKomponens from "./loading";

const Kep = function ({kepekEgyediLeirasa, kepEgyediUrl, egyediLoadingSzazalek }) {
    return (
         <div>
         <img src={kepEgyediUrl} /> 
          <p> {kepekEgyediLeirasa} </p>
            <LoadingKomponens szazalek={egyediLoadingSzazalek}/>
         </div>
    );
}

export default Kep;
