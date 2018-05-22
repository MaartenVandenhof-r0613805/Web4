package controller;

import domain.Person;
import domain.Role;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Register extends RequestHandler {

    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("IS IN METHOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        try{
            Person person = new Person();
            String email = request.getParameter("email");
            String name = request.getParameter("firstName");
            String lastName = request.getParameter("lastName");
            String password = request.getParameter("password");

            person.setFirstName(name);
            person.setLastName(lastName);
            person.setUserId(email);
            person.setPassword(password);
            person.setRole(Role.LID);
            this.personService.addPerson(person);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
