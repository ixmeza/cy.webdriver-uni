/// <reference types="cypress" />
class TodosPage{
    visit()
    {
        cy.visit("/To-Do-List/index.html");
        cy.url().should("include", "webdriveruniversity.com");
    }

    get add(){
        return cy.get(`input[placeholder='Add new todo']`)
    }

    addTask(task)
    {
        this.add.type(`${task}{enter}`)
    }

    isTaskPresent(task){
        const isPresent = cy.get('#container li').contains(task)
        return isPresent ? true : false
    }

    deleteTask(index){
        cy.get(`li:nth-child(${index}) span`).then((element) => {
           element.click()
        })
    }

    completeTask(task){
        cy.xpath(`//*[text()[contains(.,'${task}')]]`).click()
        cy.xpath(`//*[text()[contains(.,'${task}')]]`).then(($todo) => {
            expect($todo.attr('class')).to.equal('completed')
        })        
    }

    revertTaskStatus(task){
        cy.xpath(`//*[text()[contains(.,'${task}')]]`).click()
        cy.xpath(`//*[text()[contains(.,'${task}')]]`).then(($todo) => {
            expect($todo.attr('class')).to.equal('')
        })        
    }

}
export default TodosPage