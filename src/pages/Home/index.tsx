import { HandPalm, Play } from "phosphor-react";
import {HomeContainer,StartCountdownButton, StopCountdownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

type NewCycleFormData = zod.infer<typeof newCycleFormSchema>

const newCycleFormSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no mínimo 5 minutos.').max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
})

export function Home(){
    const {activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CyclesContext)
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormSchema), 
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const {handleSubmit, watch, reset} = newCycleForm
    
    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }
    


    
    
    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                    <CountDown/>

                {activeCycle ? (
                    <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
                    <HandPalm size={24}/>
                    Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    )
}