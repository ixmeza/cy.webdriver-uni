/// <reference types="cypress" />
const asset = require('chai').assert

import TodosPage from '../../support/pageObjects/todos.page'

context('E2E demo test for contact us form ', () => {
    const todos = new TodosPage()
    beforeEach(() => {
        todos.visit()
    })

    it('I should be able to add a new task', () => {
        // add new task
        todos.addTask('Drink potion')
        // verify task is added
        assert.isTrue(todos.isTaskPresent('Drink potion'))

        // adding dummy extra tasks
        cy.gendata(todos)
    })

    it('I should be able to mark as done a task', () => {
        // add new task
        todos.addTask('Drink potion')
        // complete task
        todos.completeTask('Drink potion')  
    })

    it('I should be able to unmark as done a task', () => {
        // add new task
        todos.addTask('Drink potion')
        // add complete task
        todos.completeTask('Drink potion')
        // uncomplete task 
        todos.revertTaskStatus('Drink potion')
    })

    it('I should be able to mark as done all tasks', () => {
        // adding dummy extra tasks
        cy.gendata(todos)

        // loop through all elements in list in mark them as done
        cy.get(`#container li`).each((element) => {
            cy.get(element).click()
        })  
        // verify all elements in list are done
        cy.get(`#container li`).each((element) => {      
            expect(element).to.have.attr('class', 'completed')
        })
    })
    
    it('I should be able to delete a task', () => {
        let task = 'Buy new robes'
        // retrieve task index
        let index = cy.contains('#container li', task).invoke('index').then((i) => {
            // delete task using index + 1 (since it starts at 0)
            todos.deleteTask(i+1)    
          })
        // verify task is no longer present
        cy.get(`#container li`).should(($container)=>{
            expect($container).not.to.contain(task)
        })
    })

    it('I should be able to delete all tasks', () => {
        // adding dummy extra tasks
        cy.gendata(todos)
        // retrieve all tasks and then loop each deleting it
        cy.get('#container li').then((items) => {
            for (let i = 1; i <= items.length; i++)
                todos.deleteTask(i)    
          })
        // verifying list is empty
        cy.get('#container li').should('have.length', 0)
    })

})