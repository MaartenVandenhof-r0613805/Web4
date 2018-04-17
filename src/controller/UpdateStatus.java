package controller;

import domain.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class UpdateStatus extends RequestHandler  {

    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        String status = request.getParameter("status");
        HttpSession session = request.getSession();
        Person person = (Person) session.getAttribute("user");
        person.setStatus(status);
        personService.updatePersons(person);
        System.out.println("JAVA DONE");
        System.out.println(personService.getPerson(person.getUserId()).getStatus());
        return null;
    }
}
