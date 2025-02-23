import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import CourseList from "@/components/course-list"

export default async function Page() {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/sign-in")
    }

    const { data: courses } = await supabase.from("courses").select()
    const { data: lessons } = await supabase.from("lessons").select()

    return (
        <div className="container mx-auto py-8">
            <h1 className="mb-8 text-3xl font-bold">Cursos Disponibles</h1>
            <CourseList courses={courses || []} lessons={lessons || []} />
        </div>
    )
}
