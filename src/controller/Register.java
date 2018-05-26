package controller;

import domain.Person;
import domain.Role;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

public class Register extends RequestHandler {

    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {

            Person person = new Person();
            String email = request.getParameter("email");
            String name = request.getParameter("firstName");
            String lastName = request.getParameter("lastName");
            String password = request.getParameter("password");
            String repeatPassword = request.getParameter("passRepeat");
            ArrayList<String> errors = new ArrayList<>();



            if (email == null || email.isEmpty()) {
                errors.add("No email given");
            }

            if (password == null || password.isEmpty()) {
                errors.add("No password given");
            }

        if (name == null || name.isEmpty()) {
            errors.add("No name given");
        }

        if (lastName == null || lastName.isEmpty()) {
            errors.add("No lastname given");
        }

        if (!password.equals(repeatPassword)) {
            errors.add("Repeat password not the same");
        }

        if (personService.getPerson(email) != null) {
            errors.add("Email already in use");
        }

            if (errors.size() == 0) {
                person.setFirstName(name);
                person.setLastName(lastName);
                person.setUserId(email);
                person.setHashedPassword(password);
                person.setRole(Role.LID);
                this.personService.addPerson(person);
            }

            if (errors.size() > 0) {
                request.setAttribute("errors", errors);
                return "register.jsp";
            }

        return "login.jsp";
    }
}
