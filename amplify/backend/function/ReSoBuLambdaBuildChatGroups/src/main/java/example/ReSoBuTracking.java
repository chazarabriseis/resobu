package example;

import java.sql.Date;


public class ReSoBuTracking {
		// has the chat happened?
		static final short PLANNED = 0;
		static final short MET = 1;
		// how did the chat go? feeling of organizer
		static final short BAD = 0;
		static final short OK = 1;
		static final short GREAT = 2;
		
		String email;  //person
		//String date = "yyyy.mm.dd"; //date of the meeting
		String date = Date.valueOf("2020-10-13").toString();
		short state = 0;   //0 = planned, 1 = met
		short feeling = 0; //0 = bad, 1 = OK, 2 = great

		
		public ReSoBuTracking(String e,String d,short s,short f) {
			this.email = e;
			date = d;
			state = s;
			feeling = f;
		}

		public String printableString() {
			//generates a String with all infos for a contact
			String pS="";
			pS = email+": "+date+",state= "+state+",feeling= "+feeling;
			return pS;
		}


}
