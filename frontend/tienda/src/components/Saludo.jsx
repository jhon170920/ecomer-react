import Avatar from "../assets/avatar.webp";

function Saludo (){
    return(
        <div className="w-full flex flex-col items-center justify-center p-6">
            <img src={Avatar} alt="avatar" className="w-40 h-40 rounded-full object-cover mb-4" />
            <h2 className="text-2xl font-bold">Jhon</h2>
            <p>Estoy aprendiendo a crear componentes</p>

        </div>
    )
};
export default Saludo;