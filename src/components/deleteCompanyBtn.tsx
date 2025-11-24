"use client"
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function DeleteCompanyButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    async function handleDelete() {

        try{
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company/` + id, {
                method: "DELETE"
            }
            );
    
            const data = await res.json();
    
            if (data.success) {
                toast.success(data.message);
                window.location.href = "/";
            } else {
                toast.error(data.message)
            }

        }catch(error){
            toast.error("Server error");
        }finally{
            setLoading(false)
        }
    }
    return (
        <Button
      variant="destructive"
      className="w-fit flex items-center gap-2"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4" />
          Deleting...
        </>
      ) : (
        "Delete company"
      )}
    </Button>
    )
}