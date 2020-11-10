

package example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Date;  
import java.text.SimpleDateFormat;  


public class LambdaRequestHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent event, Context context) {
        LambdaLogger logger = context.getLogger();
        // process event
        logger.log("EVENT: " + gson.toJson(event));        
        String chatInfoString = event.getBody();
        
        ReSoBuChatInfo chatInfo = initializeReSuBuChatInfo(chatInfoString, context);
        logger.log("First people attributes" + chatInfo.people.get(0).attributes);
        logger.log("Team attribute" + chatInfo.attributLists.get("team"));
        
        // convert Strings to Dates
        ArrayList<Date> chatDates = convertStringListToDateList(chatInfo.chatDates, context);

        // convert result to gson
        String result = gson.toJson(chatInfo);

        logger.log("done" + result);

        APIGatewayProxyResponseEvent response = createAPIGatewayProxyResponseEvent();
        response.setBody(result);
        return response;
    }

    public static APIGatewayProxyResponseEvent createAPIGatewayProxyResponseEvent(){
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        Map<String, String> headers = new HashMap<String, String>();
        headers.put( "Access-Control-Allow-Credentials", "True");
        headers.put("Access-Control-Allow-Headers", "Content-Type");
        headers.put("Access-Control-Allow-Methods", "OPTIONS,POST,GET");
        headers.put("Access-Control-Allow-Origin", "*");
        response.setHeaders(headers);
        return response;
    }

    public static ArrayList<Date> convertStringListToDateList(String[] chatDateList, Context context) {
        LambdaLogger logger = context.getLogger();
        ArrayList<Date> chatDates = new ArrayList<>();
        for (String _chatDate : chatDateList) {
            try {
                Date newDate = new SimpleDateFormat("dd/MM/yyyy").parse(_chatDate);
                chatDates.add(newDate);
            }
            catch(Exception e) {
                logger.log("Problem: " + e);
            }
        }   
        return chatDates;
    }

    public static ReSoBuChatInfo initializeReSuBuChatInfo(String chatInfoString, Context context) {
        LambdaLogger logger = context.getLogger();
        Gson gson = new Gson();
        try {
            ReSoBuChatInfo chatInfo = gson.fromJson(chatInfoString, ReSoBuChatInfo.class);
            chatInfo.initReSoBuChatInfo();
            return chatInfo;
        } catch (Exception e) {
            logger.log("The input body is not compliant to expected ReSoBuChatInfo object");
            return new ReSoBuChatInfo();
        }
    }
}
