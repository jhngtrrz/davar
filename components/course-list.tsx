"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Course {
    id: number
    title: string
    description: string
    instructor: string
}

interface Lesson {
    id: number
    course_id: number
    title: string
    content: string
    order_index: number
}

interface CourseListProps {
    courses: Course[]
    lessons: Lesson[]
}

export default function CourseList({ courses, lessons }: CourseListProps) {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showLessons, setShowLessons] = useState(false)

    const handleStartCourse = (course: Course) => {
        setSelectedCourse(course)
        setShowConfirmation(true)
    }

    const handleConfirm = () => {
        setShowConfirmation(false)
        setShowLessons(true)
    }

    const courseLessons = lessons
        .filter((lesson) => lesson.course_id === selectedCourse?.id)
        .sort((a, b) => a.order_index - b.order_index)

    return (
        <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <Card key={course.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>Instructor: {course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <img
                                src="/assets/mentefeliz.jpg"
                                alt={course.title}
                                className="mb-4 rounded-lg object-cover"
                                width={400}
                                height={200}
                            />
                            <p className="text-sm text-muted-foreground">{course.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={() => handleStartCourse(course)}>
                                Iniciar Curso
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar inicio del curso</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro que deseas iniciar el curso &quot;
                            {selectedCourse?.title}&quot;?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirm}>Confirmar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showLessons} onOpenChange={setShowLessons}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{selectedCourse?.title}</DialogTitle>
                        <DialogDescription>Lista de lecciones disponibles en este curso</DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                            {courseLessons.map((lesson) => (
                                <Card key={lesson.id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Lección {lesson.order_index}: {lesson.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{lesson.content}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Comenzar Lección</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowLessons(false)}>
                            Cerrar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
