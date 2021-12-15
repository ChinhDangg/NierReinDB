import java.util.Scanner;
import java.io.FileWriter;  
import java.io.IOException; 
public class HelloWorld {
    public static void main(String[] args) {
        for (int j = 0; j < 39; j++) {
            System.out.print("store["+j+"], ");
        }


        // Scanner scan = new Scanner(System.in);
        // String t = "o";
        // while (!t.contains("y")) {
        //     System.out.print("Enter companion type: ");
        //     t = scan.nextLine();
        //     String type = (t.substring(0, 1).toUpperCase()+t.substring(1, t.length()));
        //     System.out.print("Enter companion name: ");
        //     t = scan.nextLine();
        //     String name = (t.substring(0, 1).toUpperCase()+t.substring(1, t.length()));
        //     System.out.print("Enter companion Element: ");
        //     t = scan.nextLine();
        //     String element = (t);
        //     System.out.print("Enter companion Min HP stat: ");
        //     t = scan.nextLine();
        //     String hpmin = (t);
        //     System.out.print("Enter companion Min ATK stat: ");
        //     t = scan.nextLine();
        //     String attmin = (t);
        //     System.out.print("Enter companion Min DEF stat: ");
        //     t = scan.nextLine();
        //     String defmin = (t);
        //     System.out.print("Enter companion Max HP stat: ");
        //     t = scan.nextLine();
        //     String hpmax = (t);
        //     System.out.print("Enter companion Max ATK stat: ");
        //     t = scan.nextLine();
        //     String attmax = (t);
        //     System.out.print("Enter companion Max DEF stat: ");
        //     t = scan.nextLine();
        //     String defmax = (t);
        //     System.out.print("Enter companion Skill Name: ");
        //     t = scan.nextLine();
        //     String skillname = (t.substring(0, 1).toUpperCase()+t.substring(1, t.length()));
        //     System.out.print("Enter companion Effect: ");
        //     t = scan.nextLine();
        //     String effect = ("and "+t);
        //     System.out.print("Enter companion Skill Min: ");
        //     t = scan.nextLine();
        //     String skillmin = (t);
        //     String detail = "";
        //     if (!skillmin.equals("")) {
        //         System.out.print("Enter companion Details: ");
        //         t = scan.nextLine();
        //         detail = (t);
        //     }
        //     System.out.print("Enter companion ability name: ");
        //     t = scan.nextLine();
        //     String abiname = (t.substring(0, 1).toUpperCase()+t.substring(1, t.length()));

        //     String text = "\t\""+name+"\": {\n" +
        //     "\t\t\"Type\": "+"\""+type+"\",\n" +
        //     "\t\t\"Element\": "+"\""+element+"\",\n" +
        //     "\t\t\"Stats\": {\n" +
        //     "\t\t\t\"Min\": { "+"\"HP\": "+"\""+hpmin+"\""+", "+"\"ATK\": "+"\""+attmin+"\""+", "+"\"DEF\": "+"\""+defmin+"\""+" },\n" +
        //     "\t\t\t\"Max\": { "+"\"HP\": "+"\""+hpmax+"\""+", "+"\"ATK\": "+"\""+attmax+"\""+", "+"\"DEF\": "+"\""+defmax+"\""+" }\n" +
        //     "\t\t},\n" +
        //     "\t\t\"Skill\": {\n" +
        //     "\t\t\t\"Name\": "+"\""+skillname+"\",\n" +
        //     "\t\t\t\"Effect\": "+"\""+effect+"\"";
        //     if (!skillmin.equals("")) {
        //         text +=  ",\n" + "\t\t\t\"Min\": "+"\""+skillmin+"\",\n" +
        //         "\t\t\t\"Detail\": "+"\""+detail+"\"\n";
        //     }
        //     else text += "\n";
        //     text += "\t\t},\n" +
        //     "\t\t\"Ability\": {\n" +
        //     "\t\t\t\"Name\": "+"\""+abiname+"\"\n" +
        //     "\t\t}\n" +
        //     "\t},\n";
        
        //     try {
        //         FileWriter myWriter = new FileWriter("filename.txt", true);
        //         myWriter.write(text);
        //         myWriter.close();
        //         System.out.println("Successfully wrote "+ name +" to the file.");
        //     } catch (IOException e) {
        //         System.out.println("An error occurred.");
        //         e.printStackTrace();
        //     }
        //     System.out.print("Done?");
        //     t = scan.nextLine();
        // }
        // scan.close();
    } 
}
