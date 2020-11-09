package example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;


public class ReSoBuChatInfo {
	// information that will be passed on
	ArrayList<ReSoBuPerson> people;
	HashMap<String, HashMap<String, ArrayList<String>>> chatConstraintsForAll;
	int chatSize;
	String[] chatDates;
	int daysBetweenContacts;

	// information calculated with incoming information from above
	HashMap<String, ArrayList<String>> attributLists;
	HashMap<String, float[][]> chatConstraintsMatrices;
	
	public void initReSoBuChatInfo() {
		// populate attributList from first people
		populateAttributList();
		// check here if the constraints for everyone are the same or for every individual different
		calculateChatConstraintsForAll();
	}

	public void populateAttributList() {
		// add all different attributes to the HashMap first
		for (String attribute: people.get(0).attributes.keySet()) {
			// write all options of this attribute in a Set, which does not allow duplicates
			HashSet<String> options = new HashSet<>();
			for (ReSoBuPerson person: people) {
				for (String option: person.attributes.get(attribute)) {
					options.add(option);
				}
			}
			// convert the HashSet in an ArrayList for easier processing later
			ArrayList<String> optionList = new ArrayList<>(options);
			attributLists.put(attribute, optionList);
		}
	}

	public void calculateChatConstraintsForAll() {
		// build chatConstraintMatrices from people
		for (String attribute: attributLists.keySet()) {
			Integer dimension = attributLists.get(attribute).size();
			float[][] newChatConstraintsMatrix = new float[dimension][dimension];
			// weight comes as a String, so it needs to be converted from string to float
			float weight = Float.parseFloat(chatConstraintsForAll.get(attribute).get("weight").get(0)); 
			switch(chatConstraintsForAll.get(attribute).get("constrain").get(0)) {
				case "everyone except same attribute": {
					newChatConstraintsMatrix = calculateSimpleChatConstraintsMatrix(0, weight, newChatConstraintsMatrix, dimension);
					break;
				}
				case "everyone": {
					newChatConstraintsMatrix = calculateSimpleChatConstraintsMatrix(weight, weight, newChatConstraintsMatrix, dimension);
					break;
				}
				case "everyone with same attribute": {
					newChatConstraintsMatrix = calculateSimpleChatConstraintsMatrix(weight, 0, newChatConstraintsMatrix, dimension);
					break;
				}
				default: {
					newChatConstraintsMatrix = calculateComplexChatConstraintsMatrix(weight, attribute, newChatConstraintsMatrix, dimension);
					break;
				}
			}
			chatConstraintsMatrices.put(attribute, newChatConstraintsMatrix);
		}
	}
	 
	public float[][] calculateSimpleChatConstraintsMatrix(float diagonal, float offDiagonal, float[][] newChatConstraintsMatrix, Integer dimension) {
		for (int i=0;i<dimension;i++) {
			for (int j=0;j<dimension;j++) {
				newChatConstraintsMatrix[i][j] = offDiagonal;  // option for all attributes
			}
			newChatConstraintsMatrix[i][i] = diagonal;  // option for same attribute
		}
		return newChatConstraintsMatrix;
	}

	public float[][] calculateComplexChatConstraintsMatrix(float weight, String attribute, float[][] newChatConstraintsMatrix, Integer dimension) {
		// set all entries to 0
		for (int i=0;i<dimension;i++) {
			for (int j=0;j<dimension;j++) {
				newChatConstraintsMatrix[i][j] = 0;  // option for all attributes
			}
		}
		// get the indicies of selected options
		ArrayList<Integer> optionIndices = new ArrayList<>();
		for (String option: chatConstraintsForAll.get(attribute).get("constrain")) {
			int index = attributLists.get(attribute).indexOf(option);
			optionIndices.add(index);
		}

		// get combination of all indices
		ArrayList<ArrayList<Integer>> indexCombinations = new ArrayList<>();
		int combinationGroupSize = 2; 
		int r = 2; 
        int[] data = new int[r]; 
        combinationUtil(optionIndices, optionIndices.size(), combinationGroupSize, 0, data, 0, indexCombinations); 

		// set the matric entries to weight for all combinations
		for (ArrayList<Integer> combination: indexCombinations) {
			newChatConstraintsMatrix[combination.get(0)][combination.get(1)] = weight;
			newChatConstraintsMatrix[combination.get(1)][combination.get(0)] = weight;
		}
		return newChatConstraintsMatrix;
	}

	// from https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/
    static void combinationUtil(ArrayList<Integer> input, int n, int r, int index, int data[], int i, ArrayList<ArrayList<Integer>> result) { 
        // Current combination is ready to be printed, print it 
        if (index == r) { 
            ArrayList<Integer> combo = new ArrayList<>();
            for (int j=0; j<r; j++) { 
                combo.add(data[j]); 
            }
            result.add(combo);
        return; 
        } 
  
        // When no more elements are there to put in data[] 
        if (i >= n) 
            return; 
  
        // current is included, put next at next location 
        data[index] = input.get(i); 
        combinationUtil(input, n, r, index+1, data, i+1, result); 
  
        // current is excluded, replace it with next (Note that 
        // i+1 is passed, but index is not changed) 
        combinationUtil(input, n, r, index, data, i+1, result); 
	} 
	
	public float findWeight(Integer indexK1, Integer indexK2) {
		float acceptance = 1;
		// iterates through all constraintsMatrices to get value for this pair
		for (String attribute: chatConstraintsMatrices.keySet()) {
			// handle the case if ther are two teams for example...TODO!!
			int index1 = attributLists.get(attribute).indexOf(people.get(indexK1).attributes.get(attribute).get(0));
			int index2 = attributLists.get(attribute).indexOf(people.get(indexK2).attributes.get(attribute).get(0));
			acceptance *= chatConstraintsMatrices.get(attribute)[index1][index2];
		}
		return 1-acceptance;
	}
}
