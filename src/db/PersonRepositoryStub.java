package db;

import domain.Person;
import domain.Role;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PersonRepositoryStub implements PersonRepository {
	private Map<String, Person> persons = new HashMap<String, Person>();
	
	public PersonRepositoryStub () {
		Person administrator = new Person("bib@ucll.be", "t", "Bib", "Liothekaris", Role.BIB);
		add(administrator);
		Person jan = new Person("jan@ucll.be", "t", "Jan", "Janssens", Role.LID);
		add(jan);
		Person an = new Person("an@ucll.be", "t", "An", "Cornelissen", Role.LID);
		add(an);
		Person guest = new Person("guest@ucll.be", "t", "Guest", " ", Role.LID);
		add(guest);

		guest.addFriend(jan);
		jan.addFriend(guest);
		try{
			addMessage("guest@ucll.be","jan@ucll.be", "This is a test message");
			addMessage("guest@ucll.be","jan@ucll.be", "Another message");
			addMessage("guest@ucll.be","jan@ucll.be", "Again a message");
		} catch (Exception e){
			e.printStackTrace();
		}
	}
	
	public Person get(String personId){
		if(personId == null){
			throw new IllegalArgumentException("No id given");
		}
		return persons.get(personId);
	}
	
	public List<Person> getAll(){
		return new ArrayList<Person>(persons.values());	
	}

	public void add(Person person){
		if(person == null){
			throw new IllegalArgumentException("No person given");
		}
		if (persons.containsKey(person.getUserId())) {
			throw new IllegalArgumentException("User already exists");
		}
		persons.put(person.getUserId(), person);
	}
	
	public void update(Person person){
		if(person == null){
			throw new IllegalArgumentException("No person given");
		}
		persons.put(person.getUserId(), person);
	}
	
	public void delete(String personId){
		if(personId == null){
			throw new IllegalArgumentException("No id given");
		}
		persons.remove(personId);
	}
	
	public Person getAuthenticatedUser(String email, String password) {
		Person person = get(email);
		
		if (person != null && person.isCorrectPassword(password)) {
			return person;
		}
		else {
			return null;
		}
	}

	public void addMessage(String currentUserId, String friendId, String message){
		get(currentUserId).addMessage(friendId, message);
		get(friendId).addMessage(currentUserId, message);
	}
}
