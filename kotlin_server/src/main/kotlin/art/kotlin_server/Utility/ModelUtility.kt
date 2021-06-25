
package art.kotlin_server.utility
import java.util.Calendar

class ModelUtility(){
  fun CurrentMilliseconds(): Long {
    return Calendar.getInstance().timeInMillis
  }
}