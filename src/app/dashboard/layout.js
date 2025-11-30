export default function layout({ children , history, report}) {
 return(
    <>
    {children}
   <div className="w-full h-100  flex justify-center text-center mt-2">
     {history}
    {report}
   </div>
   
   
    
    </>
 )
}