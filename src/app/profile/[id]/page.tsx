export default function UserProfile({params}:any){
    return (
        <div className="flex, flex-col items-center justify-center">
            <h1 >Profile Page</h1>
            <p>{params.id}</p>
        </div>
    )
}