package controller;

import domain.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AddFriend extends RequestHandler {

    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        try{
            HttpSession session = request.getSession();
            String email = request.getParameter("email");
            Person user = (Person) session.getAttribute("user");
            Person friend = personService.getPerson(email);
            user.addFriend(friend);
            friend.addFriend(user);
            personService.updatePersons(user);
            personService.updatePersons(friend);
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
