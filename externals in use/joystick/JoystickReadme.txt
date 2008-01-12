Joystick Beta 2
by Dan Schoenblum
http://killerrobotsfromhell.com/maxmsp/joystick/
March 14, 2004

Information
-----------
Joystick is a Max/MSP external that gives access to DirectInput game
controllers.
This is a beta version.  Please email any bugs, issues, or questions to
maxmsp@dan.schoenblum.net.
Most of the functionality of the Joystick object is explained in the
Joystick.help patch.

Installation
------------
This zip contains 4 files: this readme, the license file, a Max help file,
and the external (Joystick.mxe).  To install the external, first copy
Joystick.mxe into the externals folder.  By default, this folder is located at
C:\Program Files\Common Files\Cycling '74\externals\.  Next, copy
Joystick.help into the help folder.  By default, this folder is located at
C:\Program Files\Cycling '74\MaxMSP 4.3\max-help\.  Save this readme and the
license file for future reference.

Creation
--------
When creating a Joystick object, the arguments passed to it can specify either
the name or index of a DirectInput game controller.  If no arguments are
specified, then the object will be created without a game controller set.  The
device that the object represents can be changed by sending the name or index
of a different DirectInput game controller to the object as a message.  If the
none message is sent to the object, then it won't represent any device.

Inlet
-----
The object only has 1 inlet.  These are the messages that it handles:
bang
menu
start
stop
interval <ms>
verbose
noverbose
setup
about
set <property> <value>
ff <on|off|x|y|xy> [value1] [value2]

Outlets
-------
Joystick objects have 6 outlets.  They are described below in left-to-right
order.
Sending a bang to a Joystick object will cause it to send out a message
for each button, axis, rotational axis, slider, and POV hat that it has.
Another way to get output from a Joystick object is to send it a start message.
After receiving a start, the object will immediately send out messages as if
it has received a bang.  It will then continue to send out messages every 20
milliseconds.  The 20ms span can be changed by sending the Joystick object an
interval message of the form:
interval <span>
where span is the interval time in milliseconds.  span can be sent as a long
or a float.

1) button presses and releases
<button index> <button value>
button values:
0 = release
1 = press

2) axis positions
<axis index> <axis position>
axis:
0 = X
1 = Y
2 = Z
position:
-100.0 <-> +100.0

3) axis rotations
<axis index> <rotation value>
axis:
0 = X
1 = Y
2 = Z
value:
-100.0 <-> +100.0

4) slider positions
<slider index> <slider position>
position:
0.0 <-> +100.0

5) POV hat positions
<POV hat index> <POV hat position>
the position depends on the POV hat output mode, which is set using:
set pov <mode>
where mode can be radians (default), degrees, or coords.
position (radians):
-1.0 = centered
0.0 <-> (2.0 * pi)
position (degrees):
-1.0 = centered
0.0 <-> 360.0
position (coords):
<x> <y>
x/y: -100.0, 0.0, or +100.0

6) menu items
Sending a menu message to the Joystick object will cause it to send messages
out of its rightmost outlet.  If this outlet is connected to a umenu object,
then the umenu will contain all of the detected devices, in addition to None,
which represents no selected device.  If the umenu's right outlet is connected
to the Joystick object's inlet, then selecting a device from the menu will
cause the Joystick object to represent that device.

Force Feedback
--------------
If force feedback (FF) is supported by a device, the "ff" message can be sent
to the object to control the device's FF axes.  To turn FF control of the
device on or off, send a "ff on" or "ff off" message.  When a device's FF is
first enabled with "ff on", the positions of any FF axes are set to 0.  To
control the position of the x or y axis, send a message of the form
"ff x <value>" or "ff y <value>", where value is a number between -100.0 and
+100.0.  For example, to set the position of the x-axis to be all the way to
the left, send the message "ff x -100".  Use "ff xy <x-value> <y-value>" to
send a single message that sets the position of both axes.

License
-------
See JoystickLicense.txt for licensing information.
