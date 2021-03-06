package controller;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.Person;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

public class GetUsers extends RequestHandler {
    @Override
    public String handleRequest(HttpServletRequest request, HttpServletResponse response) {
        ArrayList<Person> persons;

        persons = (ArrayList<Person>) personService.getPersons();
        try{
            String json = toJSON(persons);
            response.setContentType("application/json");
            response.getWriter().write(json);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }
        response.addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        return null;
    }

    @JsonIgnore
    public String toJSON(Object list) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        return mapper.writeValueAsString(list);
    }
}